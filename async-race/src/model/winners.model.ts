import { WinnerModel, CarWinner } from '../api';

const baseUrl = 'http://127.0.0.1:3000';

const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

export default class Winners {
  public winners: CarWinner[];

  private count: number;

  winner: WinnerModel;

  winnersPage: number;

  sortBy: string | null;

  sortOrder: string | null;

  constructor() {
    this.winners = [];
    this.count = 0;
    this.winner = { id: 0, wins: 0, time: 0 };
    this.winnersPage = 1;
    this.sortBy = null;
    this.sortOrder = null;
  }

  // Winners

  async getCar(id: number) {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`);
    const car = await response.json();
    return car;
  }

  getSortOrder(sort?: string | null, order?: string | null) {
    if (sort && order) {
      return `&_sort=${sort}&_order=${order}`;
    }
    return '';
  }

  async fetchWinners({
    page,
    limit = 10,
    sort,
    order,
  }: {
    page: number;
    limit?: number;
    sort?: string | null;
    order?: string | null;
  }) {
    const response = await fetch(
      `${baseUrl}${
        path.winners
      }?_page=${page}&_limit=${limit}${this.getSortOrder(sort, order)}`
    );
    const items = await response.json();
    const data = await Promise.all(
      items.map(async (winner: WinnerModel) => ({
        ...winner,
        car: await this.getCar(winner.id),
      }))
    );
    const count = Number(response.headers.get('X-Total-Count'));

    this.winners = data;
    this.count = count;
  }

  getWinners() {
    return this.winners;
  }

  getCount() {
    return this.count;
  }

  async getWinner(id: number) {
    const response = await fetch(`${baseUrl}${path.winners}/${id}`);
    const winner = await response.json();

    this.winner = winner;
    return this.winner;
  }

  async getWinnerStatus(id: number) {
    const response = await fetch(`${baseUrl}${path.winners}/${id}`);

    return response.status;
  }

  async createWinner(body: WinnerModel) {
    const response = await fetch(`${baseUrl}${path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const winner = await response.json();

    return winner;
  }

  async deleteWinner(id: number) {
    const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
      method: 'DELETE',
    });
    const winner = await response.json();

    return winner;
  }

  async updateWinner(id: number, body: WinnerModel) {
    const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const winner = await response.json();
    this.winner = winner;
    return this.winner;
  }

  async saveWinners({ id, time }: { id: number; time: number }) {
    const status = await this.getWinnerStatus(id);
    if (status === 404) {
      await this.createWinner({ id, wins: 1, time });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }

  async updateWinners() {
    await this.fetchWinners({
      page: this.winnersPage,
      sort: this.sortBy,
      order: this.sortOrder,
    });
    if (this.winnersPage * 10 < this.count) {
      (document.getElementById('next-btn') as HTMLButtonElement).disabled =
        false;
    } else {
      (document.getElementById('next-btn') as HTMLButtonElement).disabled =
        true;
    }

    if (this.winnersPage > 1) {
      (document.getElementById('prev-btn') as HTMLButtonElement).disabled =
        false;
    } else {
      (document.getElementById('prev-btn') as HTMLButtonElement).disabled =
        true;
    }
  }

  async setSortOrder(sortBy: string) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortBy = sortBy;
    await this.updateWinners();
    // const winnersView = document.getElementById('winners-view') as HTMLElement;

    // winnersView.innerHTML = this.renderWinners(this.winners);
  }
}
