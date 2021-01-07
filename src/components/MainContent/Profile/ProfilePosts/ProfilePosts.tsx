import React, { FC, useState } from 'react'
import { UserPostWallType } from '../../../../types/types'
import { Comment, Tooltip, List, Avatar, Form, Input, Button } from 'antd';

const {TextArea} = Input

type PropsType = {
    posts: Array<UserPostWallType>
    addComment: (comment: string) => void
}

const ProfilePosts: FC<PropsType> = ({posts, addComment}) => {

    const [value, setValue] = useState('')
    const [submitting, setSubmitting] = useState(false);

    const onCommentChange = (e: any) => {
      setValue(e.currentTarget.value)
    }

    const onSubmit = () => {
      setSubmitting(true)
      addComment(value)
      setValue('')
      setSubmitting(false)
    }

    return (
        <>
        <List
    className="comment-list"
    header={`${posts.length} replies`}
    itemLayout="horizontal"
    dataSource={posts}
    renderItem={item => (
      <li>
        <Comment
          author={'Alexander Snitko'}
          avatar={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
          content={item.message}
        />
      </li>
    )}
  />
  <Form.Item>
      <TextArea rows={4} onChange={onCommentChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
        </>
    )
}

export default ProfilePosts