import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizedComponent } from './authorized/authorized.component';

@NgModule({
  declarations: [AuthorizedComponent],
  imports: [CommonModule],
  providers: [JwtHelperService],
})
export class SecurityModule {}
