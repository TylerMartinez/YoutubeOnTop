import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubePlayerComponent } from './Components/youtube-player.component';
import { YoutubeService } from './Services/youtube.service';

@NgModule({
    declarations: [
        YoutubePlayerComponent
    ],
    exports: [
        YoutubePlayerComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        YoutubeService
    ]
})
export class YoutubePlayerModule { }
