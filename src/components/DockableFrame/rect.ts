export class Rect {
    x: number
    y: number
    w: number
    h: number


	constructor(x: number, y: number, w: number, h: number) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
	
	
	static fromVertices(x1: number, y1: number, x2: number, y2: number): Rect {
		return new Rect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
	}


	static fromElement(elem: HTMLElement) {
		const { left, top, width, height } = elem.getBoundingClientRect();
		return new Rect(left, top, width, height);
	}


	clone(): Rect {
		const { x, y, w, h } = this;
		return new Rect(x, y, w, h);
	}
	
	
	get x1(): number {
		return this.x;
	}
	
	
	get y1(): number {
		return this.y;
	}
	
	
	get x2(): number {
		return this.x + this.w;
	}
	
	
	get y2(): number {
		return this.y + this.h;
	}
	
	
	get xCenter(): number {
		return (this.x1 + this.x2) / 2;
	}
	
	
	get yCenter(): number {
		return (this.y1 + this.y2) / 2;
	}


	withX(value: number): Rect {
		const { y, w, h } = this;
		return new Rect(value, y, w, h);
	}


	withY(value: number): Rect {
		const { x, w, h } = this;
		return new Rect(x, value, w, h);
	}


	withW(value: number): Rect {
		const { x, y, h } = this;
		return new Rect(x, y, value, h);
	}


	withH(value: number): Rect {
		const { x, y, w } = this;
		return new Rect(x, y, w, value);
	}


	withX1(value: number): Rect {
		const { y1, x2, y2 } = this;
		return Rect.fromVertices(value, y1, x2, y2);
	}


	withY1(value: number): Rect {
		const { x1, x2, y2 } = this;
		return Rect.fromVertices(x1, value, x2, y2);
	}


	withX2(value: number): Rect {
		const { x1, y1, y2 } = this;
		return Rect.fromVertices(x1, y1, value, y2);
	}


	withY2(value: number): Rect {
		const { x1, y1, x2 } = this;
		return Rect.fromVertices(x1, y1, x2, value);
	}


	displace(_x: number, _y: number): Rect {
		const { x, y, w, h } = this;
		return new Rect(x + _x, y + _y, w, h);
	}


	expand(amount: number): Rect {
		const {x1, y1, x2, y2 } = this;
		return Rect.fromVertices(x1 - amount, y1 - amount, x2 + amount, y2 + amount);
	}


	expandW(amount: number): Rect {
		const { x1, y1, x2, y2 } = this;
		return Rect.fromVertices(x1 - amount, y1, x2 + amount, y2);
	}
	
	
	contains(p: { x: number, y: number }): boolean {
		const { x, y, x2, y2 } = this;
		return p.x >= x && p.x < x2 && p.y >= y && p.y < y2;
	}
	
	
	overlaps(other: Rect): boolean {
		const { x, x2, y, y2 } = this;
		return x2 >= other.x && x < other.x2 && y2 >= other.y && y < other.y2;
	}
}