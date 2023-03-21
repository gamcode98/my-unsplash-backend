import { Document } from 'mongoose'
import { Image } from './image.interface'

export interface ImageDocument extends Document, Image {}
