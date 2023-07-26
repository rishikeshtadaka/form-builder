import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilderComponentService } from '@features/form-builder/core/form-builder-component.service';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';

@Component({
  selector: 'cs-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss'],
})
export class FormRendererComponent implements OnInit {
  @Input()
  public json: any;

  @ViewChildren('formContainer', { read: ViewContainerRef })
  private formContainer: QueryList<ViewContainerRef>;

  constructor(
    private formBuilderComponentService: FormBuilderComponentService
  ) {
    this.setTestJson();
  }

  private setTestJson(): void {
    this.json = {
      container: {
        sections: [
          {
            components: [
              {
                name: FormBuilderComponentConstant.textBox,
                properties: [],
              },
              {
                name: FormBuilderComponentConstant.textArea,
              },
              {
                name: FormBuilderComponentConstant.textBox,
              },
              {
                name: FormBuilderComponentConstant.datePicker,
              },
              {
                name: FormBuilderComponentConstant.textBox,
              },
              {},
              {},
            ],
          },
        ],
      },
    };
  }

  ngOnInit(): void {}

  private renderForm(): void {
    let components = this.json.container.sections[0].components;
    let length = components.length;
    for (let i = 0; i < length; i++) {
      let componentName = components[i].name;
      this.renderComponent(componentName);
    }
  }

  private renderComponent(componentName: string): void {
    let component =
      this.formBuilderComponentService.getComponent(componentName);
    this.formContainer.get(0)?.createComponent(component.component);
  }

  ngAfterViewInit(): void {
    this.renderForm();
  }
}