import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './Components/app.component';
import { ToolbarUIComponent } from './Components/toolbar-ui.component';

import { YoutubePlayerModule } from '../YoutubePlayerModule/youtube-player.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarUIComponent
  ],
  imports: [
    BrowserModule,
    YoutubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
