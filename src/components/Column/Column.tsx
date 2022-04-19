import React, { Dispatch, FC, SetStateAction, useRef, useState, ElementRef, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ICard, IColumn, IComment } from '../../types'
import appStorage from '../../utils/Storage'
import Card from '../Card'
import Modal from '../Modal'
import OpenedCard from '../OpenedCard'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_CARD = {
	columnId: -1,
	title: '',
	description: '',
	author: '',
	id: '',
}

interface Props extends IColumn {
	cardArray: ICard[]
	columnArray: IColumn[]
	commentArray: IComment[]
	setColumnArray: Dispatch<SetStateAction<IColumn[]>>
	setCardArray: Dispatch<SetStateAction<ICard[]>>
	setCommentArray: Dispatch<SetStateAction<IComment[]>>
}

type ModalAPI = ElementRef<typeof Modal>

const Column: FC<Props> = ({
	setColumnArray,
	setCardArray,
	setCommentArray,
	cardArray,
	columnArray,
	commentArray,
	...props
}) => {
	const [openedCard, setOpenedCard] = useState<ICard>(INITIAL_CARD)
	const modalRef = useRef<ModalAPI>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const openModal = () => modalRef.current?.open()

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const newTitle = target.value

		const updatedColumnArray = columnArray.map(item => {
			if (item.id === props.id) {
				item.title = newTitle
			}

			return item
		})

		updatedColumnArray && setColumnArray(updatedColumnArray)
	}

	const addCard = () => {
		const input = inputRef.current

		if (input?.value.length) {
			const savedName = appStorage.get('name')

			if (savedName) {
				const newCard = {
					...INITIAL_CARD,
					title: input.value,
					author: savedName,
					columnId: props.id,
					id: uuidv4(),
				}
				const updatedCardArray = [...cardArray, newCard]

				input.value = ''
				setCardArray(updatedCardArray)
			}
		}
	}

	const removeCard = (card: ICard) => {
		const updatedCardArray = cardArray.filter(item => item.id !== card.id)
		setCardArray(updatedCardArray)

		const updatedCommentArray = commentArray.filter(item => item.id !== card.id)
		setCommentArray(updatedCommentArray)
	}

	const openCard = (card: ICard) => {
		setOpenedCard(card)
		openModal()
	}

	const resetOpenedCard = () => setOpenedCard(INITIAL_CARD)

	const filteredCardArray = cardArray.filter(item => item.columnId === props.id)

	return (
		<Root>
			<ColumnTitle defaultValue={props.title} onChange={handleChange}></ColumnTitle>
			<ColumnAuthor>by {props.author}</ColumnAuthor>
			<ColumnCardList>
				{filteredCardArray.map(card => {
					const cardComments = commentArray.filter(item => item.cardId === card.id)
					const cardCommentsLength = cardComments.length

					return (
						<li key={card.id}>
							<Card {...card} onOpen={openCard} onRemove={removeCard} comments={cardCommentsLength} />
						</li>
					)
				})}
			</ColumnCardList>
			<ColumnInput ref={inputRef} type="text" placeholder="Type title for new card"></ColumnInput>
			<ColumnBtn onClick={addCard}>Add card</ColumnBtn>
			<Modal ref={modalRef} canClose={true} onClose={resetOpenedCard}>
				<OpenedCard
					{...openedCard}
					column={props}
					commentArray={commentArray}
					setCommentArray={setCommentArray}
					cardArray={cardArray}
					setCardArray={setCardArray}
				/>
			</Modal>
		</Root>
	)
}

export default Column

const Root = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	height: 100vh;
	padding-block: 30px 10px;
	padding-inline: 10px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 10px 20px 1px hsl(0, 0%, 90%);
`

const ColumnTitle = styled.input`
	font-size: 1.2em;
	background-color: transparent;
	border: 0;
	padding-block: 5px;
	font-weight: 700;

	&:focus {
		background-color: hsl(0, 0%, 98%);
	}
`

const ColumnAuthor = styled.address`
	font-size: 0.9em;
	color: gray;
`

const ColumnCardList = styled.ul`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex: 1;
	border-radius: 5px;
	overflow-y: auto;
	padding: 5px;
	background-color: aliceblue;
	border: 1px solid lightgray;
`

const ColumnInput = styled.input`
	margin-top: 10px;
	padding: 5px;
	border: 0;
	border-bottom: 2px solid lightgray;
`

const ColumnBtn = styled.button`
	padding: 10px 15px;
	background-color: white;
	border: 3px solid blue;
	border-radius: 5px;
	font-weight: 700;
	color: blue;
`
