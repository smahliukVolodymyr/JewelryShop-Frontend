import { Material } from '../../../types';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-materials-popup',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './materials.popup.component.html',
})
export class MaterialsPopupComponent implements OnChanges {
  @Output() confirm = new EventEmitter<Material>();
  @Input() header!: string;
  @Input() icon!: string;
  @Input() severity: 'success' | undefined;

  @Input() material: Material = {
    name: '',
    pricePerGram: 0,
  };

  visible: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  materialForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    ],
    pricePerGram: [0, [Validators.required, Validators.min(0.1)]],
  });

  ngOnChanges() {
    this.materialForm.patchValue(this.material);
  }

  onConfirm() {
    const { name, pricePerGram } = this.materialForm.value;
    const _id = this.material._id;
    this.confirm.emit({
      _id,
      name,
      pricePerGram,
    });
    this.materialForm.reset();
    this.handleClick();
  }

  handleClick() {
    this.visible = !this.visible;
  }
}
