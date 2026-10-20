using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Middlewares
{
    public class LoggingMiddleware
    {

        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;
        public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context) {
            Guid correlationId = Guid.NewGuid();

            Stopwatch stopWatch = Stopwatch.StartNew();

            _logger.LogInformation(
            "[{CorrelationId}] Incoming request: {Method} {Path}",
            correlationId,
            context.Request.Method,
            context.Request.Path);
            try
            {
                await _next(context);
            }
            finally
            {
                stopWatch.Stop();
                _logger.LogInformation(
                    "[{CorrelationId}] Response: {StatusCode} — {ElapsedMs} ms",
                    correlationId,
                    context.Response.StatusCode,
                    stopWatch.ElapsedMilliseconds);
            }

        }
    }
}
