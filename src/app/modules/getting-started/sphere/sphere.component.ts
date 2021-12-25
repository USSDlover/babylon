import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, Vector3} from '@babylonjs/core';

@Component({
  selector: 'app-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.scss']
})
export class SphereComponent implements OnInit, AfterViewInit {
  @ViewChild('sphere') cubeCanvas: ElementRef | undefined;
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
      const camera = new FreeCamera('camera2', new Vector3(0, 5, -10), this.scene);
      camera.setTarget(Vector3.Zero());
      camera.attachControl(this.babylonCanvas, false);
      const light = new HemisphericLight('light2', new Vector3(0, 1, 0), this.scene);
      const sphere = MeshBuilder.CreateSphere('sphere1', {}, this.scene);
      sphere.position.y = 1;
      const ground = MeshBuilder.CreateGround('ground2', {}, this.scene);
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
