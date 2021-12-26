import {Animation} from '@babylonjs/core';

export class Animations {
  static getXSlide(frameRate: number, startFrame: number, endFrame: number) {
    const xSlide = new Animation(
      'xSlide',
      'position.x',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFrames = [];

    keyFrames.push({
      frame: startFrame,
      value: 2,
    });

    keyFrames.push({
      frame: endFrame,
      value: -2,
    });

    // keyFrames.push({
    //   frame: endFrame * frameRate,
    //   value: 2,
    // });

    xSlide.setKeys(keyFrames);

    return xSlide;
  }

  static getYSlide(frameRate: number, startFrame: number, endFrame: number) {
    const ySlide = new Animation(
      'ySlide',
      'position.y',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFrames = [];

    keyFrames.push({
      frame: startFrame,
      value: 2,
    });

    keyFrames.push({
      frame: endFrame,
      value: -2,
    });

    // keyFrames.push({
    //   frame: endFrame * frameRate,
    //   value: 2,
    // });

    ySlide.setKeys(keyFrames);

    return ySlide;
  }
}
