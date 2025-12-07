import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("intercepts");

	const modifiedReq = req.clone({
		withCredentials: true,
	});
	return next(modifiedReq);
};
