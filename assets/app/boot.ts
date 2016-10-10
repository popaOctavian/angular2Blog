///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import { ArticleService} from "./articles/article.service";
import {ROUTER_PROVIDERS} from "angular2/src/router/router_providers";
import {provide} from "angular2/src/core/di/provider";
import {LocationStrategy} from "angular2/src/router/location/location_strategy";
import {HashLocationStrategy} from "angular2/src/router/location/hash_location_strategy";
import {HTTP_PROVIDERS} from "angular2/http";


bootstrap(AppComponent,[ArticleService,ROUTER_PROVIDERS,provide(LocationStrategy, {useClass:HashLocationStrategy}),HTTP_PROVIDERS]);