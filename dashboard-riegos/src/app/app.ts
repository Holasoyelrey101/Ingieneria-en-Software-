import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private supabase: SupabaseClient;
  datosTelemetria: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    const supabaseUrl = 'https://cnnmwphjtgntcnchfqys.supabase.co'; 
    const supabaseKey = 'sb_publishable_DwWGosqmcZnGJwa96SJCjQ_Ctorvsnv';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async ngOnInit() {
    console.log('Intentando conectar con Supabase...');
    const { data, error } = await this.supabase
      .from('telemetria_sensores')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al traer datos:', error);
    }

    if (data) {
      console.log('Datos recibidos:', data);
      this.datosTelemetria = data;
      this.cdr.detectChanges(); 
    }
  }
}