import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metricAdder',
  standalone: true,
})
export class MetricAdderPipe implements PipeTransform {
  transform(value: string, metric: string = 'g.'): string {
    return `${value}${metric}`;
  }
}
