import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-agrimar',
  templateUrl: './agrimar.component.html',
  styleUrls: ['./agrimar.component.css']
})
export class AgrimarComponent implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const video = this.el.nativeElement.querySelector('.background-clip');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.currentTime = 0; // Restart video
            video.play(); // Play the video
          }
        });
      },
      { threshold: 0.5 } // 50% of the element should be visible to trigger
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
