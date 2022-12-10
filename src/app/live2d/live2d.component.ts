import { Component } from "@angular/core";
import { LAppDelegate } from '../../live2d-library/Samples/TypeScript/Demo/src/lappdelegate';
import * as LAppDefine from '../../live2d-library/Samples/TypeScript/Demo/src/lappdefine';

@Component({
  selector: 'moe-live2d',
  template: '',
})
export class Live2dComponent {
  ngOnInit() {
    /**
     * ブラウザロード後の処理
     */
    window.onload = (): void => {
      // create the application instance
      if (LAppDelegate.getInstance().initialize() == false) {
        return;
      }

      LAppDelegate.getInstance().run();
    };

    /**
     * 終了時の処理
     */
    window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

    /**
     * Process when changing screen size.
     */
    window.onresize = () => {
      if (LAppDefine.CanvasSize === 'auto') {
        LAppDelegate.getInstance().onResize();
      }
    };
  }
}
