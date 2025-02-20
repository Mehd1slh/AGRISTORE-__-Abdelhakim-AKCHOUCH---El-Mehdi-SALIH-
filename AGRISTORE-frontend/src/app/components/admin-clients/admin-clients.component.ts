import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { Client } from '../../controller/entities/client/client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminClientsComponent implements OnInit {
  clients: Client[] = [];
  newClient: Partial<Client> = this.getEmptyClient();
  selectedClient: Client | null = null;
  clientDialog: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log("📢 DEBUG - Clients fetched:", data);
        this.clients = data;
      },
      error: (err) => {
        console.error("🚨 ERROR - Fetching clients failed:", err);
      },
    });
  }

  openNew(): void {
    this.newClient = this.getEmptyClient();
    this.clientDialog = true;
  }

  editClient(client: Client): void {
    this.newClient = {
      ...client,
      roles: Array.isArray(client.roles) ? client.roles : [client.roles ?? 'CLIENT']
    };
    this.clientDialog = true;
  }

  hideDialog(): void {
    this.clientDialog = false;
  }

  saveClient(): void {
    const clientToSend = { ...this.newClient };

    if (!clientToSend.id) {
      delete clientToSend.id;
    }

    // Ensure roles are always an array
    clientToSend.roles = clientToSend.roles && Array.isArray(clientToSend.roles)
      ? clientToSend.roles
      : clientToSend.roles ? [clientToSend.roles] : ['CLIENT']; // Default role as 'CLIENT'


    if (clientToSend.id) {
      this.clientService.updateClient(clientToSend.id, clientToSend as Client).subscribe({
        next: (updatedClient) => {
          const index = this.clients.findIndex((c) => c.id === updatedClient.id);
          if (index !== -1) {
            this.clients[index] = updatedClient;
          }
          alert('✅ User updated successfully!');
          this.hideDialog();
        },
        error: (err) => console.error('❌ Error updating user:', err),
      });
    } else {
      this.clientService.addClient(clientToSend as Client).subscribe({
        next: (client) => {
          this.clients.push(client);
          alert('✅ User added successfully!');
          this.hideDialog();
        },
        error: (err) => console.error('❌ Error adding user:', err),
      });
    }
  }

  deleteClient(id: number): void {
    if (confirm('❗ Are you sure you want to delete this user?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.clients = this.clients.filter((c) => c.id !== id);
          alert('✅ User deleted successfully!');
        },
        error: (err) => console.error('❌ Error deleting user:', err),
      });
    }
  }

  private getEmptyClient(): Partial<Client> {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roles: ['CLIENT'] // Default to CLIENT
    };
  }
}
