import {
  Component,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './HTML/app.component.html',
  styleUrls: ['./CSS/app.component.css']
})
export class AppComponent {
  // Private Members
  private player: YT.Player;
  private ytEvent;

  // ViewChild Members
  @ViewChild('youtubeComponent') youtubeComponent;

  // Constructor
  constructor() { }

  // Event Handlers
  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
    this.setFullScreen();
  }
  onResize(event) {
    this.setFullScreen();
  }
  onUrlEntered(params: object[]) {
    if (params[0]['type'] === 'list') {
      if (params.length === 1) {
        this.youtubeComponent.playerService.playList(params[0]['value'], this.player);
      } else {
        this.youtubeComponent.playerService.playListIndex(params[0]['value'], params[1]['value'], this.player);
      }
    } else {
      this.youtubeComponent.playerService.playVideo(params[0]['value'], this.player);
    }
  }

  // Helpers
  setFullScreen() {
    if (this.player != null) {
      this.player.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
