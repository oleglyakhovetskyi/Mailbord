import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';

import { API_CONFIG } from '../../shared/api/api.config';

@Injectable()
export class ComposeService {
  constructor ( private apiService: ApiService) {};

  private apiConfig = API_CONFIG;
  private apiCompose = this.apiConfig.api.compose;

  sendMessage (data: any) {
    return this.apiService.post(this.apiCompose, data);
  }
}
