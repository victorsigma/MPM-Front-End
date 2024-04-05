import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[fadeInOut]'
})
export class FadeInOutDirective implements OnInit {
  @Input() verifyStatus: 'error' | 'completed' | 'inprocess' = 'inprocess';// Propiedad de entrada para controlar la visibilidad

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.applyAnimation(); // Aplicar animación al inicializar la directiva
  }

  ngOnChanges() {
    this.applyAnimation(); // Aplicar animación cuando cambia la visibilidad
  }

  private applyAnimation() {
    console.log(this.verifyStatus)
    if (this.verifyStatus === 'inprocess') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', '1'); // Mostrar el elemento
      this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'all 0.3s ease-in-out'); // Aplicar la animación de desvanecimiento
      console.log(this.verifyStatus)
    } else if (this.verifyStatus === 'completed') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'animation', 'none');
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'center');
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'center');

      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'var(--primary-color)');
      this.renderer.setStyle(this.elementRef.nativeElement, 'border', '12px solid var(--secondary-color)');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    } else if (this.verifyStatus === 'error') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'animation', 'none');
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'center');
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'center');

      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'var(--danger-color)');
      this.renderer.setStyle(this.elementRef.nativeElement, 'border', '12px solid var(--warning-color)');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    }
  }
}