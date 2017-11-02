import {
  Component,
  AfterContentInit,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { YoutubeService } from '../Services/youtube.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-youtube-player',
  templateUrl: './HTML/youtube-player.component.html'
})
export class YoutubePlayerComponent implements AfterContentInit {
  // Input Members
  @Input() videoId = '';
  @Input() height: number;
  @Input() width: number;
  @Input() protocol: string = this.getProtocol();
  @Input() playerVars: YT.PlayerVars = {};

  // Output Members
  @Output() ready = new EventEmitter<YT.Player>();
  @Output() change = new EventEmitter<YT.PlayerEvent>();

  // Constructor
  constructor(
    public playerService: YoutubeService,
    private renderer: Renderer2
  ) {}

  // Member Functions
  ngAfterContentInit() {
    const htmlId = this.playerService.generateUniqueId();
    const playerSize = { height: this.height, width: this.width };
    const container = this.renderer.selectRootElement('#youtube-player');
    this.renderer.setAttribute(container, 'id', htmlId);
    this.playerService.loadPlayerApi({
      protocol: this.protocol
    });
    this.playerService.setupPlayer(htmlId, {
      change: this.change,
      ready: this.ready
    }, playerSize, this.videoId, this.playerVars);
  }

  getProtocol() {
    const protocol = 'https';
    return protocol;
  }
}
