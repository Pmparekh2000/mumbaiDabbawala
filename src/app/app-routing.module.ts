import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CentralisedKitchenComponent } from './centralised-kitchen/centralised-kitchen.component';
import { ImagesAndVideosComponent } from './images-and-videos/images-and-videos.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { DigitalDabbawalaComponent } from './digital-dabbawala/digital-dabbawala.component';
import { TedTalksComponent } from './ted-talks/ted-talks.component';
import { DabbaServiceComponent } from './dabba-service/dabba-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { DabbawalaRegisterComponent } from './dabbawala-register/dabbawala-register.component';
import { DabbawalaLoginComponent } from './dabbawala-login/dabbawala-login.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'dabbawala-login',component: DabbawalaLoginComponent},
  {path: 'dabbawala-register',component: DabbawalaRegisterComponent},
  {path: 'user-login',component: UserLoginComponent},
  {path: 'user-register',component: UserRegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'dabba-service', component:DabbaServiceComponent},
  {path: 'ted-talks', component:TedTalksComponent},
  {path: 'digital-dabbawala', component:DigitalDabbawalaComponent},
  {path: 'certificates', component:CertificatesComponent},
  {path: 'images-and-videos', component:ImagesAndVideosComponent},
  {path: 'centralised-kitchen', component:CentralisedKitchenComponent},
  {path: 'fetch-data', component:FetchDataComponent},
  {path: '**',component:PageNotFoundComponent}// This page not found has to be at the last of the list of path as the components are read sequentially
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DabbawalaLoginComponent, DabbawalaRegisterComponent, UserLoginComponent, UserRegisterComponent, HomeComponent,
   AboutUsComponent, DabbaServiceComponent, TedTalksComponent, DigitalDabbawalaComponent, CertificatesComponent, ImagesAndVideosComponent,PageNotFoundComponent,
  CentralisedKitchenComponent, FetchDataComponent];