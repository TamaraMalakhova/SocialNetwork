import React from 'react'
import { Formik, Form, Field } from 'formik'
import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors;
}

type FormType = {
  term: string
  friend: "null" | "true" | "false"
}

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

  const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : 
        values.friend === 'false' ? false : true
    }
    
    props.onFilterChanged(filter)
    setSubmitting(false)
  }

  return (
      <div>
          <Formik 
              initialValues={{term:'', friend: "null"}}
              validate={usersSearchFormValidate}
              onSubmit={submit}
          >
              <Form>
                  <Field type='text' name='term' />
                  <Field name='friend' as='select' >
                    <option value='null'>All</option>
                    <option value='true'>Only followed</option>
                    <option value='false'>Only unfollowed</option>
                  </Field>
                  <button type='submit'>
                      Find
                  </button>
              </Form>
          </Formik>
      </div>
  )
})

export default UsersSearchForm