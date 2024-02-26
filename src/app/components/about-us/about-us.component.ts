import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

    public target: number = 1;

    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        console.log(this.target)
        if (scrollPosition < 200) {
            this.target = 1;
        } else if (scrollPosition < 400) {
            this.target = 2;
        } else if (scrollPosition < 600) {
            this.target = 3;
        } else if (scrollPosition < 800) {
            this.target = 4;
        } else {
            this.target = 5;
        }
    }
}
