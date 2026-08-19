import { CanActivateFn, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { RouteHost } from './route-host';

const redirectFromRoot: CanActivateFn = (_route, state) => {
	const languageService = inject(LanguageService);
	const router = inject(Router);
	const fragment = router.parseUrl(state.url).fragment ?? undefined;

	return router.createUrlTree(['/', languageService.getBrowserLanguage()], { fragment });
};

const syncLanguageFromRoute: CanActivateFn = (route, state) => {
	const languageService = inject(LanguageService);

	if (languageService.syncFromRoute(route.paramMap.get('lang'))) {
		return true;
	}

	const router = inject(Router);
	const fragment = router.parseUrl(state.url).fragment ?? undefined;
	return router.createUrlTree(['/en'], { fragment });
};

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: RouteHost,
		canActivate: [redirectFromRoot],
	},
	{
		path: ':lang',
		component: RouteHost,
		canActivate: [syncLanguageFromRoute],
	},
	{
		path: '**',
		redirectTo: 'en',
	},
];
