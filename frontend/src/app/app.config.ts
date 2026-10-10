import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([]), // Rutas vacías temporalmente para evitar errores
    provideHttpClient() // Necesario para conectar Angular con tu backend Node.js
  ]
};