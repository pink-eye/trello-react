import React, { forwardRef, ForwardRefRenderFunction, ReactElement, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'

interface API {
	open: () => void
	close: () => void
	getState: () => boolean | undefined
}

interface Props {
	isOpen?: boolean
	canClose?: boolean
	onClose?: () => void
	children: ReactElement | ReactElement[]
}

const Modal: ForwardRefRenderFunction<API, Props> = ({ isOpen, children, canClose, onClose }, forwardRef) => {
	const [isOpened, setIsOpened] = useState(isOpen)

	const close = () => {
		if (canClose) {
			setIsOpened(false)

			if (onClose) onClose()
		}
	}

	useImperativeHandle(forwardRef, () => ({
		open: () => setIsOpened(true),
		close,
		getState: () => isOpened,
	}))

	return isOpened ? (
		<Root>
			<ModalOverlay onClick={close}>
				<ModalBox onClick={event => event.stopPropagation()}>{children}</ModalBox>
			</ModalOverlay>
		</Root>
	) : (
		<></>
	)
}

export default forwardRef(Modal)

const ModalOverlay = styled.div`
	position: absolute;
	inset: 0;
	background-color: hsl(0, 0%, 0%, 0.5);
`

const Root = styled.div`
	position: fixed;
	inset: 0;
	z-index: 1;
`

const ModalBox = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	background-color: hsl(255, 100%, 100%);
	border-radius: 5px;
	padding: 30px;
	width: min(400px, 100%);
`
