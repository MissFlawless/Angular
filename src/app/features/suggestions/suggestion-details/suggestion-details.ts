import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-details',
  standalone: false,
  templateUrl: './suggestion-details.html',
  styleUrl: './suggestion-details.css',
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));

  }

  goBack() {
    this.router.navigate(['/suggestions']);
  }
}