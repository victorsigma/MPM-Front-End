import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appArrowIcon]'
})
export class ArrowIconDirective {


  @Input() isCustom: boolean = false;// Propiedad de entrada para controlar la visibilidad
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.applyAnimation(); // Aplicar animación al inicializar la directiva
  }

  ngOnChanges() {
    this.applyAnimation(); // Aplicar animación cuando cambia la visibilidad
  }

  private applyAnimation() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'all 0.3s ease-in-out'); // Aplicar la animación de desvanecimiento
    if (this.isCustom) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'all 0.3s ease-in-out'); // Aplicar la animación de desvanecimiento
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'animation', 'none');
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'center');
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'center');

      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'var(--primary-color)');
      this.renderer.setStyle(this.elementRef.nativeElement, 'border', '12px solid var(--secondary-color)');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    }
  }
}
