import { Injectable } from '@angular/core';
import { LAppLive2DManager } from 'src/live2d-library/Samples/TypeScript/Demo/src/lapplive2dmanager';
import { LAppDelegate, canvas } from 'src/live2d-library/Samples/TypeScript/Demo/src/lappdelegate';
import * as LAppDefine from 'src/live2d-library/Samples/TypeScript/Demo/src/lappdefine';


enum ModelName {
  HARU = 'Haru',
  HIYORI = 'Hiyori',
  MAO = 'Mao',
  MARK = 'Mark',
  NATORI = 'Natori',
  RICE = 'Rice',
}

@Injectable({
  providedIn: 'root',
})
export class Live2dService {
  // Live2D uses a singleton class LAppLive2DManager to manage the scenes
  // This singleton service wraps around that class in an angular way

  private live2dManager: LAppLive2DManager;

  constructor() {
    window.onresize = () => {
      if (LAppDefine.CanvasSize === 'auto') {
        LAppDelegate.getInstance().onResize();
      }
    };

    if (LAppDelegate.getInstance().initialize() == false) {
      throw new Error('Could not initialize Live2D LAppDelegate');
    }

    LAppDelegate.getInstance().run();
    this.live2dManager = LAppLive2DManager.getInstance();
  }

  ngOnDestroy(): void {
    LAppDelegate.releaseInstance();
  }

  getModelNames(): string[] {
    return Object.values(ModelName);
  }

  getCanvas(): HTMLCanvasElement {
    return canvas;
  }

  setCanvasParent(element: HTMLElement): void {
    canvas.parentElement.removeChild(canvas);
    element.appendChild(canvas);
  }

  loadModelByName(modelName: string): void {
    this.live2dManager.loadModelByName(modelName);
  }
}
