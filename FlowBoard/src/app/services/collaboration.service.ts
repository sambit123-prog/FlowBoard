import { Injectable } from '@angular/core';
import { BoardInvite } from './persistence.service';

@Injectable({ providedIn: 'root' })
export class CollaborationService {
  private invites: BoardInvite[] = [];

  constructor() {
    this.invites = JSON.parse(localStorage.getItem('flow-board-invites') ?? '[]');
  }

  invite(email: string, boardId: string): BoardInvite {
    const invite: BoardInvite = { id: Date.now(), boardId, email, accepted: false };
    this.invites.push(invite);
    localStorage.setItem('flow-board-invites', JSON.stringify(this.invites));
    return invite;
  }

  acceptInvite(id: number): void {
    this.invites = this.invites.map(item => ({ ...item, accepted: item.id === id ? true : item.accepted }));
    localStorage.setItem('flow-board-invites', JSON.stringify(this.invites));
  }

  getPendingInvites(): BoardInvite[] {
    return this.invites.filter(invite => !invite.accepted);
  }
}
