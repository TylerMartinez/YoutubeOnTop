import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IPlayerApiScriptOptions, IPlayerOutputs, IPlayerSize } from '../Models/youtube-models';

@Injectable()
export class YoutubeService {
    // Properties
    static get win () {
        return window;
    }

    static get YT() {
        return YoutubeService.win['YT'];
    }

    static get Player() {
        return YoutubeService.YT.Player;
    }

    // Members
    api: ReplaySubject<YT.Player>;

    // Private Members
    private isFullScreen = false;
    private defaultSizes = {
        height: 270,
        width: 367
    };

    // Constructors
    constructor (private zone: NgZone) {
        this.createApi();
    }

    // Methods
    loadPlayerApi (options: IPlayerApiScriptOptions) {
        const doc = YoutubeService.win.document;
        const playerApiScript = doc.createElement('script');
        playerApiScript.type = 'text/javascript';
        playerApiScript.src = `${options.protocol}://www.youtube.com/iframe_api`;
        doc.body.appendChild(playerApiScript);
    }

    setupPlayer (elementId: string, outputs: IPlayerOutputs, sizes: IPlayerSize, videoId = '', playerVars: YT.PlayerVars) {
        const createPlayer = () => {
            if (YoutubeService.Player) {
                this.createPlayer(elementId, outputs, sizes, videoId, playerVars);
            }
        };
        this.api.subscribe(createPlayer);
    }

    playVideo(id: string, player: YT.Player) {
        player.loadVideoById(id);
        player.playVideo();
    }

    playList(id: string, player: YT.Player) {
        player.cuePlaylist({
            list: id
        });
    }

    isPlaying (player: YT.Player) {
        const isPlayerReady: any = player && player.getPlayerState;
        const playerState = isPlayerReady ? player.getPlayerState() : {};
        const isPlayerPlaying = isPlayerReady
            ? playerState !== YT.PlayerState.ENDED && playerState !== YT.PlayerState.PAUSED
            : false;

        return isPlayerPlaying;
    }

    createPlayer( elementId: string, outputs: IPlayerOutputs, sizes: IPlayerSize, videoId = '', playerVars: YT.PlayerVars ) {
        const sevice = this;
        const playerSize = {
            height: sizes.height || this.defaultSizes.height,
            width: sizes.width || this.defaultSizes.width
        };

        return new YoutubeService.Player(elementId, Object.assign({}, playerSize, {
            events: {
                onReady: (ev: YT.PlayerEvent) => {
                    this.zone.run(() => outputs.ready && outputs.ready.next(ev.target));
                },
                onStateChange: (ev: YT.PlayerEvent) => {
                    this.zone.run(() => outputs.change && outputs.change.next(ev));
                }
            },
            videoId,
            playerVars,
        }));
    }

    generateUniqueId() {
        const len = 7;
        return Math.random().toString(35).substr(2, len);
    }

    private createApi () {
        this.api = new ReplaySubject(1);
        const onYoutubeIframeAPIReady = () => {
            if (YoutubeService.win) {
                this.api.next(<any> YoutubeService.YT);
            }
        };
        YoutubeService.win['onYouTubeIframeAPIReady'] = onYoutubeIframeAPIReady;
    }
}
