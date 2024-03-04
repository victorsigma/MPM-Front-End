import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

    public lang: Lang = new Lang();
    constructor(private titleService: Title, private langService: LangService) {
        this.lang = this.langService.getLang();
        this.titleService.setTitle(`MPM - About Us`)
    }

    public target: number = 1;

    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
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
