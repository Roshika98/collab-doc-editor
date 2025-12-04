import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiInterceptor } from "./interceptors/api-interceptor";

bootstrapApplication(AppComponent, {
	providers: [
		provideZoneChangeDetection(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([apiInterceptor])),
	],
}).catch((err) => console.error(err));
