import * as Sentry from '@sentry/browser'; // or '@sentry/node' for Node.js environments

/**
 * Captures a custom error and sends it to Sentry
 * @param error - The error object or message to capture
 * @param context - Additional contextual information about the error
 * @param level - The severity level of the error
 */
export const captureCustomError = (
  error: Error | string,
  context?: Record<string, any>,
  level: Sentry.SeverityLevel = 'error'
) => {
  // Create a scope for this specific capture
  Sentry.withScope((scope) => {
    // Set the severity level
    scope.setLevel(level);

    // Add additional context if provided
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }

    // Capture the error within this scope
    if (typeof error === 'string') {
      Sentry.captureMessage(error);
    } else {
      Sentry.captureException(error);
    }
  });
};

/**
 * Utility function to create and capture a custom error
 * @param message - The error message
 * @param context - Additional contextual information about the error
 * @param level - The severity level of the error
 */
export const reportCustomError = (
  message: string,
  context?: Record<string, any>,
  level: Sentry.SeverityLevel = 'error'
) => {
  const error = new Error(message);
  captureCustomError(error, context, level);
  return error;
};
