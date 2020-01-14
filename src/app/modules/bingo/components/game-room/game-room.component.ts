import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFullTreeParams } from '../../utils/common.utils';

@Component({
  selector: 'rpr-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {

  roomID: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.roomID = getFullTreeParams(this.activatedRoute).roomID;
  }

}
