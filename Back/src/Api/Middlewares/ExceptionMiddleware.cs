using Domain.Exceptions;
using System.Net;
using System.Text.Json;

namespace Api.Middlewares
{   public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro capturado pelo middleware");

                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            var status = ex is DomainException de
                ? (int)de.StatusCode
                : StatusCodes.Status500InternalServerError;

            response.StatusCode = (int)status;

            var result = JsonSerializer.Serialize(new
            {
                message = ex.Message,
                type = ex.GetType().Name,
                status = response.StatusCode,
                traceId = context.TraceIdentifier
            });

            return response.WriteAsync(result);
        }
    }

}
