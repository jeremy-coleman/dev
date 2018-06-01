import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Interceptor()
export class DataResponseInterceptor implements NestInterceptor {
	intercept(
		dataOrRequest,
		context: ExecutionContext,
		stream$: Observable<any>
	): Observable<any> {
		return stream$.map(data => ({ data }));
	}
}

import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, response) {
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			message: `It's a message from the exception filter`
		});
	}
}