import React, { FC, useState } from 'react'
import classes from './Profile.module.css'
import { UserProfileType, UserPostWallType, ContactsType } from '../../../types/types'
import { Card, Alert } from 'antd';
import { Image } from 'antd';
import ProfilePosts from './ProfilePosts/ProfilePosts'

type PropsType = {
  userProfile: UserProfileType
  userStatus: string | null
  posts: Array<UserPostWallType>
  addComment: (comment: string) => void
}

const Profile: FC<PropsType> = ({ userProfile, userStatus, posts, addComment }) => {

  const contentList: any = {
    'Main information': <>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <Alert className={classes.alert} message={`Status: ${userStatus}`} type="info" showIcon />
      <p>Looking for a Job: {userProfile.lookingForAJob}</p>
      <p>Job Description: {userProfile.lookingForAJobDescription}</p>
    </>,
    'Contacts': <>
      <p>Contacts:</p>
      {
        userProfile.contacts ?
          <>
            <p>Facebook: {userProfile.contacts.facebook}</p>
            <p>Github: {userProfile.contacts.github}</p>
            <p>Instagram: {userProfile.contacts.instagram}</p>
            <p>MainLink: {userProfile.contacts.mainLink}</p>
            <p>Twitter: {userProfile.contacts.twitter}</p>
            <p>Vk: {userProfile.contacts.vk}</p>
            <p>Website: {userProfile.contacts.website}</p>
            <p>Youtube: {userProfile.contacts.youtube}</p>
          </>
          : null
      }
    </>,
  };

  const tabList = [
    {
      key: 'Main information',
      tab: 'Main information',
    },
    {
      key: 'Contacts',
      tab: 'Contacts',
    },
  ];

  const [key, setKey] = useState('Main information')

  const onTabChange = (key: string): void => {
    setKey(key)
  }

  return (
    <>
      <Card
        style={{ width: '100%' }}
        title={userProfile.fullName}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => {
          onTabChange(key);
        }}
      >
        {contentList[key]}
      </Card>
      <br />
      <ProfilePosts posts={posts}
                    addComment={addComment} />
      <br />
    </>
  )
}

export default Profile