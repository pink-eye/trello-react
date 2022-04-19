export interface IColumn {
	id: number
	title: string
	author: string
}

export interface ICard {
	id: string
	title: string
	description: string
	author: string
	columnId: number
}

export interface IComment {
	id: string
	text: string
	author: string
	cardId: string
}
