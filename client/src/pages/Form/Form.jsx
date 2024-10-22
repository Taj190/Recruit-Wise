
import { Form, Input, Button, Radio, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Form.css';
import axios from 'axios';

const CandidateDetails = () => {
  const [form] = Form.useForm(); // Create form instance using Ant Design's useForm hook

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('taxNumber', values.taxNumber);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('address', values.address);
    formData.append('phone', values.phone); // Ensure consistent naming
    formData.append('residencyCard', values.residencyCard);
 
    if (values.cv && values.cv[0]) {
      // Check if there is a file uploaded
      formData.append('cv', values.cv[0].originFileObj); // Extract the actual file object
    }

    // Sending the FormData to the backend
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/form-submission/data-submission`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        message.success('Your details have been submitted successfully!');
        form.resetFields(); // Reset the form fields after submission
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      message.error('There was an error submitting your details. Please try again.');
    }
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
  };

  return (
    <div className="candidate-details-section">
      <div className="container">
        <h2 className="heading">Join Us Today!</h2>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <p className="info-text">
              We are committed to finding the best temporary labor solutions for employers. 
              Fill in your details below to join our talent pool. 
              We are here to support you every step of the way!
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="col-md-6">
            <Form
              form={form} // Link form instance to the Form component
              name="candidateDetails"
              onFinish={onFinish}
              validateMessages={validateMessages}
              layout="vertical"
            >
              <Form.Item
                name="taxNumber"
                label="Tax Number *"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="name"
                label="Name *"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email *"
                rules={[{ required: true }, { type: 'email' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone" // Ensure consistent naming
                label="Phone *"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address *"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="residencyCard"
                label="Is your residency card valid for at least 6 months? *"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="true">Yes</Radio>
                  <Radio value="false">No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="cv"
                label="Attach your CV (PDF format) *"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true }]}
              >
                <Upload
                  name="cv"
                  accept=".pdf"
                  beforeUpload={() => false} // Prevent auto upload
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload CV</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

// To handle file upload event
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default CandidateDetails;
