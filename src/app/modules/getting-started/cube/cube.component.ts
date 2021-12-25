import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Engine, Scene, FreeCamera, MeshBuilder, Vector3, HemisphericLight} from '@babylonjs/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, AfterViewInit {
  @ViewChild('cube') cubeCanvas: ElementRef | undefined;
  @HostListener('window:resize') onWindowResize = () => {
    this.renderTheScene();
  }

  babylonCanvas: HTMLCanvasElement | undefined;
  babylonEngine: Engine | undefined;

  scene: Scene | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.cubeCanvas) {
      this.initTheCube();
    }
  }

  initTheCube() {
    this.babylonCanvas = this.cubeCanvas?.nativeElement;
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
      const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this.scene);
      camera.setTarget(Vector3.Zero());
      camera.attachControl(this.babylonCanvas, false);
      const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
      const sphere = MeshBuilder.CreateSphere('sphere1', {}, this.scene);
      sphere.position.y = 1;
      const ground = MeshBuilder.CreateGround('ground1', {}, this.scene);
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

}
