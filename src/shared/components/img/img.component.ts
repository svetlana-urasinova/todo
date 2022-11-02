import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/shared/services';
import { ImgTypes } from 'src/shared/types/components/img-types';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'styled-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  @Input() public src: string;
  @Input() public type: ImgTypes = ImgTypes.Default;
  @Input() public alt: string;
  @Input() public height: number;
  @Input() public width: number;
  @Input() public stretch = false;

  public imgTypes = ImgTypes;

  public iconBaseUrl: string;
  public iconFilename: string;

  constructor(private readonly navigationService: NavigationService) {}

  public ngOnInit(): void {
    this.iconBaseUrl = this.navigationService.getIconBaseUrl();

    if (this.type === ImgTypes.Svg) {
      this.iconFilename = this.src.substring(0, this.src.lastIndexOf('.'));
    }
  }
}
