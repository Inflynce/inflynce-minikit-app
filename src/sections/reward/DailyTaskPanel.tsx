import React, { useEffect, useState } from 'react';
import { Box, List } from '@mui/material';
import {
  InfiniteData,
  DefinedUseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import { GetUserTasksInfinitQueryOptions } from '@/queryFn/getTasks';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { User_Tasks } from '@/__generated__/graphql';
import dynamic from 'next/dynamic';
import { PostTasksMutationOptions } from '@/queryFn/postTasks';
import TaskSkeleton from '@/components/skeleton/TaskSkeleton';
import { useIdentityToken } from '@privy-io/react-auth';
import { UpdateTaskMutationOptions } from '@/queryFn/updateTask';
import { handleFarcasterLogin } from '@/utils/auth';
import { useLoginToFrame } from '@privy-io/react-auth/farcaster';
import { useSnackbar } from '@/contexts/SnackbarContext';

const VisitInflynceTask = dynamic(() => import('@/components/dailyTask/VisitInflynceTask'), {
  ssr: false,
  loading: () => null,
});

export default function DailyTaskPanel() {
  const { context } = useMiniKit();
  const { identityToken } = useIdentityToken();
  const { initLoginToFrame, loginToFrame } = useLoginToFrame();
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const { showSnackbar } = useSnackbar();

  // Format today's date as ISO string
  const today = new Date().toISOString().split('T')[0]; // This will give YYYY-MM-DD format

  const { data, fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery(
    GetUserTasksInfinitQueryOptions({
      variables: {
        userId: context?.user?.fid?.toString() ?? '',
        date: today,
        limit: 100,
      },
      options: {
        enabled: !!context?.user?.fid,
      },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<User_Tasks[]>>;

  const tasks = data?.pages.flatMap((page) => page) || [];

  const {
    mutate,
    isPending: isMutating,
    status: mutationStatus,
  } = useMutation(
    PostTasksMutationOptions({
      variables: {
        userId: context?.user?.fid?.toString() ?? '',
      },
      options: {
        onSuccess: () => {
          console.log('Task creation successful');
          refetch();
        },
        onError: (error) => {
          console.error('Failed to create tasks:', error);
        },
      },
    })
  );

  const { mutate: updateTask, isPending: isUpdatePending } = useMutation(
    UpdateTaskMutationOptions({
      variables: {
        taskId: '',
      },
      token: identityToken ?? '',
      options: {
        onSuccess: () => {
          console.log('Task update successful');
          refetch();
          setPendingTaskId(null);
          showSnackbar('Task claimed successfully!', 'success', 3000);
        },
        onError: (error) => {
          console.error('Failed to update task:', error);
          setPendingTaskId(null);
          showSnackbar('Failed to claim task. Please try again.', 'error', 3000);
        },
      },
    })
  );

  useEffect(() => {
    // Only attempt to create tasks when:
    // 1. We have a valid user ID
    // 2. The query has completed loading (not on first render)
    // 3. There are no tasks
    // 4. We're not already in the process of creating tasks
    // 5. We haven't already attempted a mutation that failed
    if (
      context?.user?.fid &&
      !isLoading &&
      data &&
      tasks.length === 0 &&
      !isMutating &&
      mutationStatus !== 'error'
    ) {
      console.log('No tasks found for today, creating new tasks');
      mutate({
        userId: context.user.fid.toString(),
      });
    }
  }, [context?.user?.fid, isLoading, data, tasks.length, isMutating, mutate, mutationStatus]);

  const handleClaim = async (taskId: string) => {
    if (!identityToken) {
      await handleFarcasterLogin(initLoginToFrame, loginToFrame);
      return;
    }

    setPendingTaskId(taskId);
    await updateTask({ taskId });
  };

  // Function to render the appropriate task component based on action type
  const renderTaskByActionType = (task: User_Tasks) => {
    const actionTypeId = task.task.actionType.id;
    const isTaskPending = pendingTaskId === task.id;

    switch (actionTypeId) {
      case 1: // "visit" action type
        return (
          <VisitInflynceTask
            key={task.id}
            task={task}
            onClaim={handleClaim}
            isPending={isTaskPending && isUpdatePending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // py: 4,
      }}
    >
      {/* <InfiniteScroll
          dataLength={tasks.length}
          next={fetchNextPage}
          hasMore={false}
          loader={<Typography sx={{ textAlign: 'center', py: 2 }}>Loading Tasks...</Typography>}
          endMessage={
            <Box textAlign="center" p={10}>
              <Typography variant="body1" gutterBottom>
                You have seen all tasks!
              </Typography>
            </Box>
          }
          style={{ width: '100%' }}
          scrollableTarget="scrollableDiv"
          scrollThreshold="90%"
        > */}
      {isLoading ? (
        <List sx={{ width: '100%' }}>
          <TaskSkeleton count={4} />
        </List>
      ) : (
        <List sx={{ width: '100%' }}>{tasks.map((task) => renderTaskByActionType(task))}</List>
      )}
      {/* </InfiniteScroll> */}
    </Box>
  );
}
