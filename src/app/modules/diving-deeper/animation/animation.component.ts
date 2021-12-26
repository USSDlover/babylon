import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Animatable, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3} from '@babylonjs/core';
import {Animations} from '../animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('animation') animationCanvas: ElementRef | undefined;
  @HostListener('window:resize') onWindowResize = () => {
    this.renderTheScene();
  }

  babylonCanvas: HTMLCanvasElement | undefined;
  babylonEngine: Engine | undefined;

  scene: Scene | undefined;
  box: Mesh | undefined;
  animatable: Animatable | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.animationCanvas) {
      this.initTheCube();
    }
  }

  initTheCube() {
    this.babylonCanvas = this.animationCanvas?.nativeElement;
    if (this.babylonCanvas) {
      this.babylonEngine = new Engine(this.babylonCanvas, true, {preserveDrawingBuffer: true, stencil: true});

      this.createScene();
    }
  }

  createScene() {
    if (this.babylonEngine) {
      this.scene = new Scene(this.babylonEngine);
    }

    if (this.scene) {
      const camera = new FreeCamera('animationCamera', new Vector3(0, 5, -10), this.scene);
      camera.setTarget(Vector3.Zero());
      camera.attachControl(this.babylonCanvas, false);
      const light = new HemisphericLight('animationLight', new Vector3(0, 1, 0), this.scene);
      this.box = MeshBuilder.CreateBox('animationBox', {}, this.scene);
      this.box.position.y = 1;
    }

    this.renderTheScene();
  }

  renderTheScene() {
    if (this.babylonEngine) {
      this.babylonEngine.runRenderLoop(() => {
        if (this.scene)
          this.scene.render();
      })
    }
  }

  animateTheCube(): void {
    const startFrame = 0;
    const endFrame = 10;
    const frameRate = 10;

    const xSlide = Animations.getXSlide(frameRate, startFrame, endFrame);
    const ySlide = Animations.getYSlide(frameRate, startFrame, endFrame);

    if (this.box) {
      this.box.animations.push(xSlide);
      this.box.animations.push(ySlide);
      if (this.scene) {
        this.animatable = this.scene.beginDirectAnimation(this.box, [xSlide, ySlide], startFrame, endFrame, true);
      }
    }
  }

  onAnimateControl(control: 'pause' | 'restart' | 'stop' | 'reset') {
    if (this.animatable) {
      switch (control) {
        case 'pause':
          this.animatable.pause();
          break;
        case 'restart':
          this.animatable.restart();
          break;
        case 'stop':
          this.animatable.stop();
          break;
        case 'reset':
          this.animatable.reset();
          break;
        default:
          break;
      }
    }
  }

  ngOnDestroy() {
  }
}
