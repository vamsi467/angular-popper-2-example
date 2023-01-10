import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';

import { createPopper, Instance } from '@popperjs/core';

@Component({
  selector: 'dds-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopperComponent implements OnInit {
  popperInstance!: Instance;

  // @Input() button!: ElementRef;
  // @Input() tooltip!: ElementRef;
  @ViewChild('bt', { static: true }) button!: ElementRef;
  @ViewChild('tooltip', { static: true }) tooltip!: ElementRef;

  ngOnInit() {
    this.popperInstance = createPopper(
      this.button.nativeElement,
      this.tooltip.nativeElement,
      {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      }
    );
  }

  show(): void {
    // Make the tooltip visible
    this.tooltip.nativeElement.setAttribute('data-show', '');

    // Enable the event listeners
    this.popperInstance.setOptions((options: any) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true },
      ],
    }));

    // Update its position
    this.popperInstance.update();
  }

  hide() {
    // Hide the tooltip
    this.tooltip.nativeElement.removeAttribute('data-show');

    // Disable the event listeners
    this.popperInstance.setOptions((options: any) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false },
      ],
    }));
  }
}
