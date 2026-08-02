import { Injectable } from '@angular/core';
import { BoardInvite } from './persistence.service';
import { JsonServerService } from './json-server.service';

const INVITE_KEY = 'flow-board-invites';

@Injectable({ providedIn: 'root' })
export class CollaborationService {
  private invites: BoardInvite[] = [];

  constructor(private jsonServer: JsonServerService) {
    this.invites = this.jsonServer.read<BoardInvite>(INVITE_KEY);
  }

  private persistInvites(): void {
    this.jsonServer.replace<BoardInvite>(INVITE_KEY, this.invites);
  }

  invite(email: string, boardId: string): BoardInvite {
    const invite: BoardInvite = { id: Date.now(), boardId, email, accepted: false };
    this.invites = [invite, ...this.invites];
    this.persistInvites();
    return invite;
  }

  acceptInvite(id: number): void {
    this.invites = this.invites.map(item => ({ ...item, accepted: item.id === id ? true : item.accepted }));
    this.persistInvites();
  }

  getPendingInvites(): BoardInvite[] {
    return this.invites.filter(invite => !invite.accepted);
  }
}
