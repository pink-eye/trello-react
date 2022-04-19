import React, { useState } from 'react'
import styled from 'styled-components'
import { IColumn, IComment, ICard } from '../../types'
import Column from '../Column/Column'

const INITIAL_COLUMN_ARRAY = [
	{
		id: 1,
		title: 'TODO',
		author: 'noname',
	},
	{
		id: 2,
		title: 'In progress',
		author: 'noname',
	},
	{
		id: 3,
		title: 'Testing',
		author: 'noname',
	},
	{
		id: 4,
		title: 'Done',
		author: 'noname',
	},
]

const ColumnList = () => {
	const [columnArray, setColumnArray] = useState<IColumn[]>(INITIAL_COLUMN_ARRAY)
	const [cardArray, setCardArray] = useState<ICard[]>([])
	const [commentArray, setCommentArray] = useState<IComment[]>([])

	return (
		<Root>
			{columnArray.map((column, index) => (
				<ColumnListItem key={column.id}>
					<Column
						{...column}
						columnArray={columnArray}
						setColumnArray={setColumnArray}
						cardArray={cardArray}
						setCardArray={setCardArray}
						commentArray={commentArray}
						setCommentArray={setCommentArray}
					/>
				</ColumnListItem>
			))}
		</Root>
	)
}

export default ColumnList

const Root = styled.ul`
	display: flex;
	gap: 30px;
	padding-block: 30px;
	padding-inline: 10px;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	background-color: aliceblue;
`
const ColumnListItem = styled.li`
	height: 100%;
	min-width: 300px;
`
