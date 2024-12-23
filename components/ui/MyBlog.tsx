'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardContent,
} from './card'
import Link from 'next/link'
import { findUser } from '@/app/actions/findUser'
import { User } from '@/types/user'
import Avatar from '@/public/images/Avatar.png'
import { FaBars } from 'react-icons/fa6'
import MySettings from './MySettings'

export interface BlogProps {
    id: string,
    title: string,
    description: string,
    content: any,
    image: string,
    createdAt: string,
    userId?: string
}

const MyBlog: React.FC<BlogProps> = ({
    createdAt,
    id,
    description,
    image,
    title,
    userId
}) => {
    const [user, setUser] = useState<User | undefined>();
    useEffect(() => {
        const fetchUser = async () => {
            const userResult = await findUser(userId);
            setUser(userResult.data[0]);
        }
        fetchUser();
    });

    if (!id) {
        return null;
    }

    return (
        <Card className='md:w-[30vw] hover:scale-105 transition-transform flex flex-col justify-between md:min-h-[35vw] w-full'>
            <CardHeader className='flex flex-col gap-2'>
                <div className='w-full flex justify-end'>
                    <MySettings
                        trigger={<FaBars
                            size={20}
                            color='#000'
                            className='cursor-pointer'
                        />}
                        id={id}
                    />
                </div>
                <div>
                    {image && (
                        <Image
                            alt=''
                            src={image}
                            width={400}
                            height={400}
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className='w-full flex flex-col justify-between gap-2'>
                <Link
                    href={`/blogs/${id}`}
                >
                    <div className='flex items-center gap-1'>
                        <div>Posted on</div>
                        <div>{createdAt?.slice(0, 10)}</div>
                    </div>
                    <div className='text-2xl font-bold'>{title}</div>
                    <div className=''>{description}</div>
                    <div className='flex justify-end'>
                        <div className='flex items-center gap-2'>
                            <div>
                                <Image
                                    alt=''
                                    src={user?.image || Avatar}
                                    width={30}
                                    height={30}
                                    className='rounded-full'
                                />
                            </div>
                            <div>{user?.name}</div>
                        </div>
                    </div>
                </Link >
            </CardContent>
        </Card>
    )
}

export default MyBlog