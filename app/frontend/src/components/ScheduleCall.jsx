import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  DatePicker, 
  message
} from 'antd';
import { 
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CloseOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './ScheduleCall.scss';

const { TextArea } = Input;
const { Option } = Select;

const ScheduleCall = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callTypes = [
    { value: 'consultation', label: 'Project Consultation' },
    { value: 'quote', label: 'Get a Quote' },
    { value: 'technical', label: 'Technical Discussion' }
  ];

  const onFinish = async (values) => {
    setIsSubmitting(true);
    
    // Format the call scheduling data for email
    const emailSubject = `Call Scheduling Request: ${values.callType}`;
    const emailBody = `
Call Scheduling Request Submitted

Call Details:
- Call Type: ${values.callType}
- Preferred Date: ${values.date ? values.date.format('MMMM DD, YYYY') : 'Not specified'}
- Brief Description: ${values.description || 'None'}

Contact Information:
- Name: ${values.name}
- Email: ${values.email}
- Phone: ${values.phone}

This call scheduling request was submitted through your portfolio website.
    `.trim();

    // Create mailto link with the call scheduling data
    const mailtoLink = `mailto:butuandeveloper@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open the user's default email client
    window.open(mailtoLink, '_blank');
    
    console.log('Scheduling call:', values);
    
    message.success('Call scheduling request submitted! Your email client will open to send the request to our team.');
    setIsSubmitting(false);
    onClose();
  };

  const disabledDate = (current) => {
    // Disable past dates and weekends
    return current && (current < dayjs().startOf('day') || current.day() === 0 || current.day() === 6);
  };

  return (
    <div className="schedule-call">
      <div className="schedule-call__container">
        <div className="schedule-call__header">
          <div className="schedule-call__header-content">
            <div className="schedule-call__header-content-icon">
              <CalendarOutlined />
            </div>
            <div className="schedule-call__header-content-text">
              <h2>Schedule a Call</h2>
              <p>Quick 30-minute consultation</p>
            </div>
          </div>
          
          <div className="schedule-call__header-close">
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={onClose}
            />
          </div>
        </div>

        <div className="schedule-call__content">
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              callType: 'consultation'
            }}
            className="schedule-call__form"
          >
            <div className="name-email-row">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Your name"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="your@email.com"
                  size="large"
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="+1 (555) 123-4567"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Call Type"
              name="callType"
              rules={[{ required: true, message: 'Please select a call type' }]}
            >
              <Select size="large">
                {callTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Preferred Date"
              name="date"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder="Select date"
                disabledDate={disabledDate}
                format="MMM DD, YYYY"
              />
            </Form.Item>

            <Form.Item
              label="Brief Description"
              name="description"
            >
              <TextArea
                rows={3}
                placeholder="What would you like to discuss? (optional)"
                size="large"
              />
            </Form.Item>
          </Form>
        </div>

        <div className="schedule-call__footer">
          <div className="schedule-call__footer-info">
            <CalendarOutlined />
            <span>30-minute free consultation</span>
          </div>
          
          <div className="schedule-call__footer-buttons">
            <Button 
              type="default" 
              onClick={onClose}
              size="large"
              className="schedule-call__footer-button schedule-call__footer-button--secondary"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              size="large"
              icon={<CalendarOutlined />}
              className="schedule-call__footer-button"
              onClick={() => {
                const form = document.querySelector('.schedule-call__form form');
                if (form) {
                  form.dispatchEvent(new Event('submit', { bubbles: true }));
                }
              }}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Call'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCall;
