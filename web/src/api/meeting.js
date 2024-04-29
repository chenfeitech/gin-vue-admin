import service from '@/utils/request'

// 管理会议室api
export const getRoomList = (params) => {
  return service({
    url: '/meeting/listRooms',
    method: 'get',
    params
  })
}

export const createRoom = (data) => {
  return service({
    url: '/meeting/createRoom',
    method: 'post',
    data
  })
}

export const getRoomById = (params) => {
  return service({
    url: '/meeting/getRoom',
    method: 'get',
    params
  })
}

export const updateRoom = (data) => {
  return service({
    url: '/meeting/updateRoom',
    method: 'put',
    data
  })
}

export const deleteRoom = (data) => {
  return service({
    url: '/meeting/delroom',
    method: 'delete',
    data
  })
}

// 管理会议api
export const getMeetingList = (params) => {
  return service({
    url: '/meeting/listMeeting',
    method: 'get',
    params
  })
}

export const addMeeting = (data) => {
  return service({
    url: '/meeting/addMeeting',
    method: 'post',
    data
  })
}

export const queryMeetingById = (params) => {
  return service({
    url: '/meeting/queryMeeting',
    method: 'get',
    params
  })
}

export const updateMeeting = (data) => {
  return service({
    url: '/meeting/updateMeeting',
    method: 'put',
    data
  })
}

export const delMeeting = (data) => {
  return service({
    url: '/meeting/delMeeting',
    method: 'delete',
    data
  })
}